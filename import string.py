import string
import random


def generate_password(length, use_lower=True, use_upper=True, use_digits=True, use_symbols=True):
    characters = ""

    if use_lower:
        characters += string.ascii_lowercase
    if use_upper:
        characters += string.ascii_uppercase
    if use_digits:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not isinstance(length, int) or length < 1:
        return None, "Password length should be a positive integer"

    if not characters:
        return None, "You must select at least one character set"

    password = "".join(random.choice(characters) for _ in range(length))
    return password, None


def ask_yes_no(message):
    answer = input(message + " (y/n): ").strip().lower()
    return answer == "y"

if __name__ == "__main__":
    try:
        length = int(input("Password length: "))
    except ValueError:
        print("Password length should be a number")
    else:
        use_lower = ask_yes_no("Include lowercase letters?")
        use_upper = ask_yes_no("Include uppercase letters?")
        use_digits = ask_yes_no("Include digits?")
        use_symbols = ask_yes_no("Include symbols?")

        password, error = generate_password(length, use_lower, use_upper, use_digits, use_symbols)
        if error:
            print(error)
        else:
            print("Generated password:", password)
