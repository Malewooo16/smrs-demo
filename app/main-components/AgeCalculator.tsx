"use client"

import calculateAge from "@/utilities/ageCalculator"


export default function AgeComponent({dob}:{dob:Date}) {
  return (
    <p className="text-grey-500 font-semibold mb-2"> Age: {calculateAge(dob)}  </p>
  )
}
