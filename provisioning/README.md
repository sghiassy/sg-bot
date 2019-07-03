The `aws_keys.yml` is encypted via Ansible-Vault. The password for which is stored in 1Password.

That password will then allow you to decreypt `secrets.prod.yml.encypted` which stores Oauth Tokens for the Server