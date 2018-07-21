function gpaValue (score, gpaRule) {
  for (let n in gpaRule.score) {
    if (score >= gpaRule.score[n]) {
      return gpaRule.gpa[n]
    }
  }
}
export function imnuGpa (data, gpaRule) {
  var allScoreC = 0
  var singleGpa = 0
  var allCreditC = 0
  var gpa = 1
  var allCredit = 0
  var averageScore = 0
  for (var x in data) {
    singleGpa = gpaValue(data[x].score, gpaRule)
    // console.log(singleGpa, gpaRule)
    allCreditC += singleGpa * parseFloat(data[x].credit)
    allScoreC += parseFloat(data[x].credit) * parseFloat(data[x].score)
    allCredit += parseFloat(data[x].credit)
    averageScore += 1
  }
  averageScore = allScoreC / allCredit
  averageScore = parseFloat(averageScore).toFixed(3)
  gpa = allCreditC / allCredit
  gpa = parseFloat(gpa).toFixed(3)

  return {gpa: gpa, average: averageScore}
}

export default {
  imnuGpa
}
