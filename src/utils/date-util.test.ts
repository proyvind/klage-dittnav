import {
  formatDate,
  isValidDateString,
  toISOString,
  formattedDateToDateObject,
} from "./date-util";

describe("Dato-testing", () => {
  it("Returnerer gyldig dato-format fra en gyldig dato-streng", () => {
    expect(formatDate(new Date("2012-12-31"))).toBe("12/31/2012");
  });

  it("Returnerer default-tekst om dato er ugyldig", () => {
    expect(formatDate(new Date("2012-13-31"))).toBe("Ingen dato satt");
  });

  it("Valider dato-streng", () => {
    expect(isValidDateString("12/13/2012")).toBe(true);
    expect(isValidDateString("13/12/2012")).toBe(false);
  });

  it("Valider at formatert dato-objekt er gyldig dato", () => {
    let dateObject = formattedDateToDateObject("12/12/2012");
    expect(isValidDateString(dateObject.toDateString())).toBe(true);
  });
  it("Valider at iso-dato gir korrekt resultat", () => {
    expect(toISOString(new Date("32/01/2019"))).toBe("");
    expect(toISOString(new Date("01/31/2012"))).toBe("2012-01-31");
  });
});
