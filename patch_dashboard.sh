#!/bin/bash
# Move useEffect after fetchBookings and fetchPrakriti declarations

FILE="src/pages/Dashboard.js"
TMP="src/pages/Dashboard.tmp.js"

awk '
/useEffect\(\(\) => \{/ {
  in_use_effect = 1
  buffer = $0 "\n"
  next
}
in_use_effect {
  buffer = buffer $0 "\n"
  if (/}, \[token, fetchBookings, fetchPrakriti\]\);/) {
    in_use_effect = 0
    # Dont print yet, save for later
    use_effect_block = buffer
  }
  next
}
/const handleLogout = \(\) => \{/ {
  # print the saved block here
  print use_effect_block
  print $0
  next
}
{ print $0 }
' $FILE > $TMP

mv $TMP $FILE
