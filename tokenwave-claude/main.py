import json
import os
import sys

FILENAME = "expenses.json"


def load_expenses():
    if not os.path.exists(FILENAME):
        return []
    try:
        with open(FILENAME, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def save_expenses(expenses):
    with open(FILENAME, "w", encoding="utf-8") as f:
        json.dump(expenses, f, ensure_ascii=False, indent=2)


def add_expense(amount, category):
    if amount <= 0:
        print("Ошибка: сумма должна быть положительной.")
        return False
    if not category or not category.strip():
        print("Ошибка: категория не может быть пустой.")
        return False

    expenses = load_expenses()
    expenses.append(
        {"amount": round(amount, 2), "category": category.strip()}
    )
    save_expenses(expenses)
    print(f"Добавлено: {amount:.2f} — {category.strip()}")
    return True


def list_expenses():
    expenses = load_expenses()
    if not expenses:
        print("Расходов нет.")
        return
    for i, e in enumerate(expenses, 1):
        print(f"{i}. {e['amount']:.2f} — {e['category']}")


def summary_by_category():
    expenses = load_expenses()
    if not expenses:
        print("Расходов нет.")
        return
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0.0) + e["amount"]
    for category in sorted(totals):
        print(f"{category}: {totals[category]:.2f}")


def print_help():
    print("Использование: python main.py <команда> [аргументы]")
    print()
    print("Команды:")
    print("  add <сумма> <категория>   Добавить расход")
    print("  list                      Показать все расходы")
    print("  summary                   Общая сумма по категориям")


def main():
    if len(sys.argv) < 2:
        print_help()
        return

    command = sys.argv[1]

    if command == "add":
        if len(sys.argv) != 4:
            print("Ошибка: укажите сумму и категорию.")
            print("Пример: python main.py add 1500 Продукты")
            return
        try:
            amount = float(sys.argv[2].replace(",", "."))
        except ValueError:
            print("Ошибка: сумма должна быть числом.")
            return
        category = sys.argv[3]
        add_expense(amount, category)
    elif command == "list":
        list_expenses()
    elif command == "summary":
        summary_by_category()
    else:
        print(f"Неизвестная команда: {command}")
        print_help()


if __name__ == "__main__":
    main()
