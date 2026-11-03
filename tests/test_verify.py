import unittest
from datetime import datetime, timedelta, timezone
from eth_account import Account
from eth_account.messages import encode_defunct
from verify_apg import canonical_message, verify, ROOT

class VerifyTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 3, 12, tzinfo=timezone.utc)
        self.account = Account.from_key("0x" + "11" * 32)  # public TEST key, never ROOT
        self.msg = {
            "address": self.account.address,
            "nonce": "test_nonce_1234567890",
            "issued_at": "2026-11-03T11:00:00Z",
            "expires_at": "2026-11-03T13:00:00Z",
        }
    def signed(self):
        m = self.msg
        sig = Account.sign_message(encode_defunct(text=canonical_message(m["address"],m["nonce"],m["issued_at"],m["expires_at"])), "0x" + "11"*32).signature.hex()
        return {"schema":"apg-presence/v1","message":dict(m),"signature":"0x"+sig,"status":"SIGNED"}
    def test_unsigned_placeholder(self):
        self.assertEqual(verify({"schema":"apg-presence/v1","status":"UNSIGNED","signature":None}), "UNSIGNED")
    def test_valid_signature_but_wrong_root(self):
        with self.assertRaisesRegex(ValueError,"ROOT address mismatch"):
            verify(self.signed(),self.now)
    def test_tampered_nonce(self):
        proof=self.signed()
        proof["message"]["address"]=ROOT
        proof["message"]["nonce"]="altered_nonce_123456"
        with self.assertRaises(ValueError):
            verify(proof,self.now)
    def test_expired(self):
        proof=self.signed()
        proof["message"]["address"]=ROOT
        proof["message"]["expires_at"]="2026-11-03T11:30:00Z"
        with self.assertRaises(ValueError):
            verify(proof,self.now)
    def test_positive_cryptographic_recovery(self):
        m=self.msg
        sig=self.signed()["signature"]
        recovered=Account.recover_message(encode_defunct(text=canonical_message(m["address"],m["nonce"],m["issued_at"],m["expires_at"])),signature=sig)
        self.assertEqual(recovered,self.account.address)

if __name__ == "__main__":
    unittest.main()
