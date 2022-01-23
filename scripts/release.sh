#!/usr/bin/env sh
set -e

# git checkout master
# git merge develop

# 版本选择 cli
VERSION=`npx select-version-cli`

# 是否确认当前版本信息
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION npm run build

  # commit
  # git add -A
  # git commit -m "[build] $VERSION"
  # # 更改组件库的版本信息
  # npm version $VERSION --message "[release] $VERSION"

  # git push origin master
  # git checkout develop
  # git rebase master
  # git push origin develop

  # 发布函数库
  # npm publish

fi
