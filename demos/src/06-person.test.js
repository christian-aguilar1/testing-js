const Person = require('./06-person');

// AAA
describe('Test for Person', () => {
  let person;
  // Arrange - Preparar
  beforeEach(() => {
    person = new Person('John', 45, 1.7);
  });

  test('should return down', () => {
    // Act - ejecutar
    const imc = person.calcIMC();
    // Assert - resolver hipótesis
    expect(imc).toBe('down');
  });

  test('should return normal', () => {
    person.weight = 59;
    expect(person.calcIMC()).toBe('normal');
  });

  test('should return overweight', () => {
    person.weight = 75;
    expect(person.calcIMC()).toBe('overweight');
  });

  test('should return overweight level 1', () => {
    person.weight = 85;
    expect(person.calcIMC()).toBe('overweight level 1');
  });

  test('should return overweight level 2', () => {
    person.weight = 90;
    expect(person.calcIMC()).toBe('overweight level 2');
  });

  test('should return overweight level 3', () => {
    person.weight = 120;
    expect(person.calcIMC()).toBe('overweight level 3');
  });
});
