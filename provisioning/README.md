# Deploying Setup

## HipChat Keys

The HipChat secrets are stored in an encyprted file `secrets.prod.yml`. See [Example](https://github.com/serverless/examples/tree/master/aws-node-env-variables-encrypted-in-a-file) for more info.

```
# Example Commands
serverless encrypt --stage staging --password XXXXXXXX
serverless decrypt --stage prod --password XXXXXXXX
```

## AWS Keys

If you're on a new machine, you will need to configure the keys again by running

```
serverless config credentials --provider aws --profile sg-bot --key XXXXXXXX --secret XXXXXXX
```

The AWS Access Keys are stored in `provisioning/aws_keys.yml`. To decrypt the file you can run `ansible-vault view provisioning/aws_keys.yml`. The password for Ansible-vault is in 1password.
