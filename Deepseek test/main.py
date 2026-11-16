import json
import os
import sys

EXPENSES_FILE = "expenses.json"


def load_expenses():
    if not os.path.exists(EXPENSES_FILE):
        return []
    try:
        with open(EXPENSES_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except (json.JSONDecodeError, ValueError):
        return []


def save_expenses(expenses):
    with open(EXPENSES_FILE, "w", encoding="utf-8") as f:
        json.dump(expenses, f, ensure_ascii=False, indent=2)


def add_expense(amount, category):
    if amount <= 0:
        raise ValueError("Сумма должна быть положительной.")
    if not category or not category.strip():
        raise ValueError("Категория не должна быть пустой.")

    expenses = load_expenses()
    expenses.append({
        "amount": amount,
        "category": category.strip(),
    })
    save_expenses(expenses)


def list_expenses():
    return load_expenses()


def totals_by_category():
    expenses = load_expenses()
    totals = {}
    for expense in expenses:
        category = expense.get("category", "")
        totals[category] = totals.get(category, 0) + expense.get("amount", 0)
    return totals


def main():
    if len(sys.argv) < 2:
        print("Использование: python main.py <команда> [аргументы]")
        print("Команды:")
        print("  add <сумма> <категория>   Добавить расход")
        print("  list                      Показать все расходы")
        print("  totals                    Общая сумма расходов по категориям")
        return

    command = sys.argv[1]

    try:
        if command == "add":
            if len(sys.argv) != 4:
                print("Использование: python main.py add <сумма> <категория>")
                return
            amount = float(sys.argv[2])
            category = sys.argv[3]
            add_expense(amount, category)
            print(f"Добавлено: {amount} — {category}")

        elif command == "list":
            expenses = list_expenses()
            if not expenses:
                print("Расходы не найдены.")
                return
            for i, expense in enumerate(expenses, start=1):
                print(f"{i}. {expense['amount']} — {expense['category']}")

        elif command == "totals":
            totals = totals_by_category()
            if not totals:
                print("Расходы не найдены.")
                return
            grand_total = 0
            for category, amount in totals.items():
                print(f"{category}: {amount}")
                grand_total += amount
            print(f"Итого: {grand_total}")

        else:
            print(f"Неизвестная команда: {command}")
    except ValueError as e:
        print(f"Ошибка: {e}")


if __name__ == "__main__":
    main()