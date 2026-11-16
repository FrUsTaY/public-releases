"""Консольное приложение для учёта расходов на Python 3.12."""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

DATA_FILE = Path("expenses.json")


def load_expenses(filepath: Path = DATA_FILE) -> list[dict[str, Any]]:
    """Загружает список расходов из файла. Если файла нет, создает пустой."""
    if not filepath.exists():
        save_expenses([], filepath)
        return []

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            return []
    except (json.JSONDecodeError, OSError) as e:
        print(f"Ошибка при чтении файла {filepath}: {e}", file=sys.stderr)
        return []


def save_expenses(expenses: list[dict[str, Any]], filepath: Path = DATA_FILE) -> None:
    """Сохраняет список расходов в JSON-файл."""
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(expenses, f, ensure_ascii=False, indent=2)
    except OSError as e:
        print(f"Ошибка при сохранении в файл {filepath}: {e}", file=sys.stderr)
        sys.exit(1)


def validate_expense(amount: float, category: str) -> tuple[float, str]:
    """Проверяет корректность суммы и категории.

    Возвращает очищенные значения или выбрасывает ValueError.
    """
    if amount <= 0:
        raise ValueError("Сумма расхода должна быть строго положительным числом (> 0).")

    cleaned_category = category.strip()
    if not cleaned_category:
        raise ValueError("Категория не может быть пустой.")

    return round(amount, 2), cleaned_category


def add_expense(amount: float, category: str, filepath: Path = DATA_FILE) -> dict[str, Any]:
    """Добавляет новый расход в файл."""
    val_amount, val_category = validate_expense(amount, category)
    expenses = load_expenses(filepath)

    new_item = {
        "id": len(expenses) + 1,
        "amount": val_amount,
        "category": val_category,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    expenses.append(new_item)
    save_expenses(expenses, filepath)
    return new_item


def list_expenses(filepath: Path = DATA_FILE) -> list[dict[str, Any]]:
    """Возвращает все расходы и выводит их в консоль."""
    expenses = load_expenses(filepath)
    if not expenses:
        print("Список расходов пуст.")
        return expenses

    print(f"\n{'ID':<5} {'Дата':<20} {'Категория':<20} {'Сумма':>10}")
    print("-" * 60)
    total = 0.0
    for item in expenses:
        total += item["amount"]
        item_id = item.get("id", "-")
        date = item.get("date", "-")
        cat = item.get("category", "")
        amt = item.get("amount", 0.0)
        print(f"{item_id:<5} {date:<20} {cat:<20} {amt:>10.2f}")
    print("-" * 60)
    print(f"{'ИТОГО:':<47} {total:>10.2f}\n")
    return expenses


def get_summary_by_category(filepath: Path = DATA_FILE) -> dict[str, float]:
    """Считает общую сумму расходов по категориям и выводит результат."""
    expenses = load_expenses(filepath)
    if not expenses:
        print("Список расходов пуст.")
        return {}

    category_totals: dict[str, float] = {}
    total_sum = 0.0
    for item in expenses:
        cat = item["category"]
        amt = item["amount"]
        category_totals[cat] = category_totals.get(cat, 0.0) + amt
        total_sum += amt

    print(f"\n{'Категория':<25} {'Сумма':>12}")
    print("-" * 40)
    for cat, total in sorted(category_totals.items(), key=lambda x: x[1], reverse=True):
        print(f"{cat:<25} {total:>12.2f}")
    print("-" * 40)
    print(f"{'ИТОГО:':<25} {total_sum:>12.2f}\n")

    return category_totals


def interactive_menu(filepath: Path = DATA_FILE) -> None:
    """Интерактивное текстовое меню для управления расходами."""
    print("=" * 40)
    print("      УЧЁТ РАСХОДОВ (EXPENSE TRACKER)")
    print("=" * 40)

    while True:
        print("\nВыберите действие:")
        print("1. Добавить расход")
        print("2. Показать все расходы")
        print("3. Общая сумма по категориям")
        print("0. Выход")

        choice = input("\nВаш выбор: ").strip()

        if choice == "1":
            try:
                raw_amount = input("Введите сумму расхода: ").strip().replace(",", ".")
                amount = float(raw_amount)
                category = input("Введите категорию: ").strip()
                item = add_expense(amount, category, filepath)
                print(f"✓ Расход успешно добавлен: {item['amount']:.2f} руб. в категорию '{item['category']}'")
            except ValueError as e:
                print(f"Ошибка ввода: {e}")
        elif choice == "2":
            list_expenses(filepath)
        elif choice == "3":
            get_summary_by_category(filepath)
        elif choice in ("0", "exit", "quit", "q"):
            print("До свидания!")
            break
        else:
            print("Неверный пункт меню. Попробуйте снова.")


def build_parser() -> argparse.ArgumentParser:
    """Создает парсер аргументов командной строки."""
    parser = argparse.ArgumentParser(
        description="Консольное приложение для учёта расходов.",
        epilog="Запустите без аргументов для входа в интерактивное меню.",
    )
    subparsers = parser.add_subparsers(dest="command", help="Доступные команды")

    # Команда add
    add_parser = subparsers.add_parser("add", help="Добавить расход")
    add_parser.add_argument("amount", type=float, help="Сумма расхода (положительное число)")
    add_parser.add_argument("category", type=str, help="Категория расхода")

    # Команда list
    subparsers.add_parser("list", help="Показать все расходы")

    # Команда summary
    subparsers.add_parser(
        "summary",
        aliases=["stats", "categories"],
        help="Вывести сумму расходов по категориям",
    )

    return parser


def main() -> None:
    """Точка входа в приложение."""
    # Если аргументы не переданы, запускаем интерактивный режим
    if len(sys.argv) == 1:
        interactive_menu()
        return

    parser = build_parser()
    args = parser.parse_args()

    if args.command == "add":
        try:
            item = add_expense(args.amount, args.category)
            print(f"✓ Добавлен расход #{item['id']}: {item['amount']:.2f} в категорию '{item['category']}'")
        except ValueError as err:
            print(f"Ошибка валидации: {err}", file=sys.stderr)
            sys.exit(1)
    elif args.command == "list":
        list_expenses()
    elif args.command in ("summary", "stats", "categories"):
        get_summary_by_category()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
