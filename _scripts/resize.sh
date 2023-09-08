#!/bin/bash

function optimize() {
  if [[ "${1}" == *.jpg ]]
  then
    jpegtran -copy none -optimize -progressive -outfile "${1}.tmp" "${1}"
    mv "${1}.tmp" "${1}"
  fi
  if [[ "${1}" == *.png ]]
  then
    optipng -quiet -o2 -strip all "${1}"
  fi
}

cd "${1}"
find "3000" -type f | (
  while read file
  do
    #optimize "${file}"
    base="$(basename "${file}")"
    for size in 360 480 800 1280 1440 1920
    do
      #convert "${file}" -resize "${size}x${size}" "${size}/${base}"
      sips -Z "${size}" "${file}" --out "${size}/"
      #optimize "${size}/${base}"
    done
  done
)
