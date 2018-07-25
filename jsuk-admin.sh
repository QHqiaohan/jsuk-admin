#!/usr/bin/env bash


tmpDir="/tmp/jsuk-admin"
deployDir="/usr/share/nginx/html/admin"

check_file(){
  fil=$tmpDir/$1.tar.gz
  if [ ! -f $fil ]; then
    echo " 没有找到文件 $fil !"
    exit 1
  fi
}

extract(){
  echo "开始解压 $1"
  tar -zxf $tmpDir/$1.tar.gz -C $deployDir --strip-components 1
}

remove() {
  rm -rf $deployDir
}

if [ ! -d $deployDir ]; then
  if [ -f $deployDir ]; then
    rm -rf $deployDir
  fi
  mkdir -p $deployDir
fi

parms=$@
for parm in ${parms[*]}; do

  case $parm in
  jsuk-admin)
    check_file jsuk-admin
    #remove *
    extract jsuk-admin
    ;;
  *)
    echo "未知参数: $parm"
    ;;
  esac

done
