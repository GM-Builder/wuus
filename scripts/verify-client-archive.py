"""Restore the fictional source archive into a new, contained directory and rebuild."""
import hashlib
import json
from pathlib import Path
import shutil
import stat
import subprocess
import zipfile

website = Path(__file__).resolve().parent.parent
output = (website.parent / "outputs/wuus-readiness-20261007/handover").resolve()
archive = output / "casa-aurora-source.zip"
target = (output / "archive-restore").resolve()
if not target.is_relative_to(output) or target.exists():
    raise RuntimeError("Use a fresh, contained archive restore directory; existing files are preserved")
report_path = website / "docs/client-readiness/qa/delivery-simulation-report.json"
report = json.loads(report_path.read_text(encoding="utf-8"))
if report.get("simulation") is not True:
    raise RuntimeError("Only the fictional internal archive may be restored")
if hashlib.sha256(archive.read_bytes()).hexdigest() != report["sourceArchiveSha256"]:
    raise RuntimeError("Source archive checksum mismatch")
with zipfile.ZipFile(archive) as source:
    entries = source.infolist()
    if len(entries) > 1000 or sum(item.file_size for item in entries) > 100_000_000:
        raise RuntimeError("Unexpected archive size")
    for item in entries:
        destination = (target / item.filename).resolve()
        if not destination.is_relative_to(target) or stat.S_ISLNK(item.external_attr >> 16):
            raise RuntimeError("Unsafe archive entry")
    target.mkdir()
    source.extractall(target)
node = shutil.which("node")
if not node:
    raise RuntimeError("Node.js is required for the restore build")
subprocess.run([node, "build.mjs"], cwd=target, check=True, capture_output=True, text=True)
rebuilt_hash = hashlib.sha256((target / "dist/index.html").read_bytes()).hexdigest()
if rebuilt_hash != report["finalHtmlSha256"]:
    raise RuntimeError("Restored archive does not reproduce the approved output")
report["archiveRestoreHtmlSha256"] = rebuilt_hash
report["limitations"] = [item for item in report["limitations"] if item != "Archive checksum recorded; Git checkout restore tested"]
report["steps"].append("Source ZIP checksum, safe extraction and identical rebuild verified")
for file in [report_path, output / "verification.json"]:
    file.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"archiveRestoreVerified": True, "htmlSha256": rebuilt_hash, "actualRevenue": 0}))
