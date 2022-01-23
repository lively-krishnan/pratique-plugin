#!/usr/bin/env sh
# Automatic exit due to execution error
  set -e 
# commit
  echo "Start executing git automation scripts"

  git add -A
  git commit -m "$1" 2>&1 

  if [ $2 ]
  then
    git push origin "$2"
  elif branch=$(git symbolic-ref --short -q HEAD) 
  then
      git push origin $branch
  else
      echo not on any branch
      exit;
  fi
  
  # 清理文件夹
  npm run clean

  echo "推送成功"