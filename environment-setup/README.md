# 🛠️ Environment Setup

Software setup
---

Install brew:
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
Follow instruction from terminal to add `brew` to `PATH`

`brew update`
`xcode-select --install` Should be already installed with brew
`xcode-select -p`

Install nvm for node versions management:
`brew install nvm`
Follow instruction from terminal to add `nvm` to `PATH`
`nvm --version`
Install node:
`nvm install 22`
`node --version`

Install pnpm for node packages management:
`curl -fsSL https://get.pnpm.io/install.sh`
Restart your shell
`pnpm --version`

Install uv for python packages management:
`curl -LsSf https://astral.sh/uv/install.sh | sh`
Restart your shell
`uv --version`

Install foundry for Ethereum development:
`curl -L https://foundry.paradigm.xyz | bash`
Restart your shell
`foundryup`

Install docker desktop:
https://docs.docker.com/desktop/setup/install/mac-install/

Add ssh keygen to your github account:
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent


IDE setup
---

vs-code:
https://code.visualstudio.com/docs/setup/mac

pycharm:
https://www.jetbrains.com/pycharm/download/?section=mac
