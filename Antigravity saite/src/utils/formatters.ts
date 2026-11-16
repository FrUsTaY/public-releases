/**
 * Утилиты форматирования для сайта PIXEL SERVICE
 */

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(amount)) + ' ₽';
}

export function formatPhone(phone: string): string {
  // Очистка от лишних символов
  const cleaned = ('' + phone).replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  }
  return phone;
}

export function validatePhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  // Должно быть 11 цифр и начинаться с 7 или 8
  return digitsOnly.length === 11 && (digitsOnly.startsWith('7') || digitsOnly.startsWith('8'));
}
