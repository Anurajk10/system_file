## 2024-07-16 - Unary Minus in Custom Parsers

**Learning:** When replacing `eval()` or `new Function()` with a custom parser for performance, it's critical to handle all edge cases of the language's syntax. The unary minus operator (`-`) is a common pitfall, as it can be easily confused with the binary subtraction operator. My initial Shunting-yard implementation failed to account for this, leading to a critical bug.

**Action:** In the future, when writing a parser, I will explicitly test for unary operators at the beginning of expressions, after parentheses, and after other operators to ensure they are handled correctly. I will also add specific test cases for these scenarios in my verification scripts.