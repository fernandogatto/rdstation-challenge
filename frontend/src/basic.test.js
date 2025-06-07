describe('Testes básicos de configuração', () => {
  test('Jest está funcionando corretamente', () => {
    expect(true).toBe(true);
  });
});

// Teste para verificar se o ambiente está configurado corretamente
describe('Configuração do ambiente', () => {
  test('environment é jsdom', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
  });

  test('DOM básico funciona', () => {
    const elemento = document.createElement('div');
    elemento.textContent = 'Hello World';
    document.body.appendChild(elemento);

    expect(elemento.textContent).toBe('Hello World');
    expect(document.body.contains(elemento)).toBe(true);
  });
});
