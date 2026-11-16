"""Небольшое консольное приложение для учёта расходов."""

from __future__ import annotations

import argparse
import json
import math
from collections import defaultdict
from pathlib import Path
from typing import Any


DATA_FILE = Path(__file__).with_name("expenses.json")


def load_expenses() -> list[dict[str, Any]]:
    """Загрузить расходы, создав файл при первом запуске."""
    if not DATA_FILE.exists():
        DATA_FILE.write_text("[]\n", encoding="utf-8")
        return []

    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as error:
        raise SystemExit(f"Не удалось прочитать {DATA_FILE.name}: {error}") from error

    if not isinstance(data, list):
        raise SystemExit(f"Файл {DATA_FILE.name} должен содержать JSON-массив.")
    return data


def save_expenses(expenses: list[dict[str, Any]]) -> None:
    DATA_FILE.write_text(
        json.dumps(expenses, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def positive_amount(value: str) -> float:
    try:
        amount = float(value.replace(",", "."))
    except ValueError as error:
        raise argparse.ArgumentTypeError("сумма должна быть числом") from error
    if not math.isfinite(amount) or amount <= 0:
        raise argparse.ArgumentTypeError("сумма должна быть положительной")
    return amount


def non_empty_category(value: str) -> str:
    category = value.strip()
    if not category:
        raise argparse.ArgumentTypeError("категория не может быть пустой")
    return category


def format_amount(amount: float) -> str:
    return f"{amount:.2f}"


def add_expense(amount: float, category: str) -> None:
    expenses = load_expenses()
    expenses.append({"amount": amount, "category": category})
    save_expenses(expenses)
    print(f"Расход добавлен: {format_amount(amount)} — {category}")


def list_expenses() -> None:
    expenses = load_expenses()
    if not expenses:
        print("Расходов пока нет.")
        return
    for index, expense in enumerate(expenses, start=1):
        print(f"{index}. {format_amount(float(expense['amount']))} — {expense['category']}")


def show_summary() -> None:
    expenses = load_expenses()
    totals: defaultdict[str, float] = defaultdict(float)
    for expense in expenses:
        totals[str(expense["category"])] += float(expense["amount"])
    if not totals:
        print("Расходов пока нет.")
        return
    for category in sorted(totals):
        print(f"{category}: {format_amount(totals[category])}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Учёт расходов")
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="добавить расход")
    add_parser.add_argument("amount", type=positive_amount, help="положительная сумма")
    add_parser.add_argument("category", type=non_empty_category, help="категория")

    subparsers.add_parser("list", help="показать все расходы")
    subparsers.add_parser("summary", help="итоги по категориям")
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
