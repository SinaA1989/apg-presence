#!/usr/bin/env python3
"""Verify an owner-supplied EIP-191 personal_sign proof; never signs or transacts."""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from eth_account import Account
from eth_account.messages import encode_defunct

ROOT = "0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2"
SCHEMA = "apg-presence/v1"
NONCE = re.compile(r"^[A-Za-z0-9_-]{16,128}$")
FIELDS = ("APG Presence Proof v1", "Address", "Nonce", "Issued At", "Expires At", "Purpose")

def canonical_message(address, nonce, issued_at, expires_at):
    return "\\n".join((
        FIELDS[0], f"Address: {address}", f"Nonce: {nonce}",
        f"Issued At: {issued_at}", f"Expires At: {expires_at}",
        "Purpose: Public proof of ROOT wallet control only; no transactions, approvals or delegation."
    )).replace("\\n", "\n")

def parse_time(s):
    if not isinstance(s, str) or not re.fullmatch(r"\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z", s):
        raise ValueError("Timestamp must use UTC YYYY-MM-DDTHH:MM:SSZ")
    return datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)

def verify(proof, now=None):
    if proof.get("schema") != SCHEMA:
        raise ValueError("Invalid schema")
    if proof.get("status") == "UNSIGNED" and not proof.get("signature"):
        return "UNSIGNED"
    msg = proof.get("message")
    sig = proof.get("signature")
    if not isinstance(msg, dict) or not isinstance(sig, str):
        raise ValueError("Missing signed message or signature")
    if set(msg) != {"address", "nonce", "issued_at", "expires_at"}:
        raise ValueError("Unexpected message fields")
    address, nonce = msg["address"], msg["nonce"]
    if not isinstance(address, str) or address.lower() != ROOT.lower():
        raise ValueError("ROOT address mismatch")
    if not isinstance(nonce, str) or not NONCE.fullmatch(nonce):
        raise ValueError("Nonce invalid")
    issued, expires = parse_time(msg["issued_at"]), parse_time(msg["expires_at"])
    now = now or datetime.now(timezone.utc)
    if issued > now or expires <= now or expires <= issued:
        raise ValueError("Proof not currently valid")
    if expires - issued > __import__("datetime").timedelta(days=7):
        raise ValueError("Proof validity exceeds 7 days")
    if not re.fullmatch(r"0x[0-9a-fA-F]{130}", sig):
        raise ValueError("Signature must be 65-byte hex")
    payload = canonical_message(address, nonce, msg["issued_at"], msg["expires_at"])
    signer = Account.recover_message(encode_defunct(text=payload), signature=sig)
    if signer.lower() != ROOT.lower():
        raise ValueError("Recovered signer is not ROOT")
    return "VERIFIED"

if __name__ == "__main__":
    try:
        proof = json.loads(Path(sys.argv[1] if len(sys.argv)>1 else "nx1-proof.json").read_text())
        status = verify(proof)
        print(f"APG ROOT proof: {status}")
        if status != "VERIFIED":
            print("No signed ROOT proof has been established.")
    except (ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print(f"APG ROOT proof: INVALID ({exc})", file=sys.stderr)
        sys.exit(1)
