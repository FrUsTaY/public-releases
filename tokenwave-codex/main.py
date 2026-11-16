"""Простое консольное приложение для учёта расходов."""

import argparse
import json
import math
from pathlib import Path


DATA_FILE = Path("expenses.json")


def load_expenses() -> list[dict]:
    """Загрузить расходы, создав файл при первом запуске."""
    if not DATA_FILE.exists():
        DATA_FILE.write_text("[]\n", encoding="utf-8")
        return []

    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Не удалось прочитать {DATA_FILE}: {error}") from error

    if not isinstance(data, list):
        raise RuntimeError(f"Файл {DATA_FILE} должен содержать JSON-массив")
    return data


def save_expenses(expenses: list[dict]) -> None:
    DATA_FILE.write_text(
        json.dumps(expenses, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def positive_amount(value: str) -> float:
    try:
        amount = float(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError("сумма должна быть числом") from error
    if not math.isfinite(amount) or amount <= 0:
        raise argparse.ArgumentTypeError("сумма должна быть положительной")
    return amount


def non_empty_category(value: str) -> str:
    category = value.strip()
    if not category:
        raise argparse.ArgumentTypeError("категория не должна быть пустой")
    return category


def add_expense(amount: float, category: str) -> None:
    expenses = load_expenses()
    expenses.append({"amount": amount, "category": category})
    save_expenses(expenses)
    print(f"Расход добавлен: {amount:.2f} ({category})")


def list_expenses() -> None:
    expenses = load_expenses()
    if not expenses:
        print("Расходов пока нет.")
        return
    for index, expense in enumerate(expenses, start=1):
        print(f"{index}. {float(expense['amount']):.2f} — {expense['category']}")


def show_summary() -> None:
    expenses = load_expenses()
    totals: dict[str, float] = {}
    for expense in expenses:
        category = str(expense["category"])
        totals[category] = totals.get(category, 0.0) + float(expense["amount"])
    if not totals:
        print("Расходов пока нет.")
        return
    for category, amount in sorted(totals.items()):
        print(f"{category}: {amount:.2f}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Учёт расходов")
    commands = parser.add_subparsers(dest="command", required=True)

    add_parser = commands.add_parser("add", help="добавить расход")
    add_parser.add_argument("amount", type=positive_amount, help="положительная сумма")
    add_parser.add_argument("category", type=non_empty_category, help="категория")

    commands.add_parser("list", help="показать все расходы")
    commands.add_parser("summary", help="итоги по категориям")
    return parser


def main() -> None:
    args = build_parser().parse_args()
    if args.command == "add":
        add_expense(args.amount, args.category)
    elif args.command == "list":
        list_expenses()
    elif args.command == "summary":
        show_summary()


if __name__ == "__main__":
    main()
