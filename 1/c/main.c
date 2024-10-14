#include "guppy.h"

bool is_alpha(char c) {
    return isalpha(c);
}

bool is_digit(char c) {
    return c >= '0' && c <= '9';
}

int char_to_int(char c) {
    switch (c) {
        case '0': return 0;
        case '1': return 1;
        case '2': return 2;
        case '3': return 3;
        case '4': return 4;
        case '5': return 5;
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        default:  return -1;
    }
}

int main(void) {
    GupArena a = gup_arena_create();

    { // Part 1
        int answer = 0;

        GupArrayString lines = gup_file_read_lines_arena(&a, "../input.txt");

        for (int i = 0; i < lines.count; i++) {
            GupString line = lines.data[i];

            int first_number = 0;
            int last_number = 0;

            for (int i = 0; i < line.count; i++) {
                if (is_digit(line.data[i])) {
                    first_number = char_to_int(line.data[i]);
                    break;
                }
            }

            for (int i = line.count-1; i >= 0; i--) {
                if (is_digit(line.data[i])) {
                    last_number = char_to_int(line.data[i]);
                    break;
                }
            }

            int line_number = (10 * first_number) + last_number; 
            answer += line_number;
        }

        printf("Part 1: %d\n", answer);
    }

    { // Part 2
        int answer = 0;

        GupArrayString lines = gup_file_read_lines_arena(&a, "../input.txt");

        for (int i = 0; i < lines.count; i++) {
            GupString line = lines.data[i];

            int first_number = 0;
            int last_number = 0;

            GupString first_word = gup_string(&a, "");
            for (int i = 0; i < line.count; i++) {
                if (is_digit(line.data[i])) {
                    first_number = char_to_int(line.data[i]);
                    break;
                }

                gup_array_char_append(&first_word, line.data[i]);

                if (gup_string_ends_with_cstr(first_word, "one")) {
                    first_number = 1;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "two")) {
                    first_number = 2;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "three")) {
                    first_number = 3;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "four")) {
                    first_number = 4;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "five")) {
                    first_number = 5;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "six")) {
                    first_number = 6;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "seven")) {
                    first_number = 7;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "eight")) {
                    first_number = 8;
                    break;
                }
                if (gup_string_ends_with_cstr(first_word, "nine")) {
                    first_number = 9;
                    break;
                }
            }

            GupString last_word = gup_string(&a, "");
            for (int i = line.count-1; i >= 0; i--) {
                if (is_digit(line.data[i])) {
                    last_number = char_to_int(line.data[i]);
                    break;
                }
                
                gup_string_prepend(&last_word, line.data[i]);

                if (gup_string_starts_with_cstr(last_word, "one")) {
                    last_number = 1;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "two")) {
                    last_number = 2;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "three")) {
                    last_number = 3;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "four")) {
                    last_number = 4;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "five")) {
                    last_number = 5;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "six")) {
                    last_number = 6;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "seven")) {
                    last_number = 7;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "eight")) {
                    last_number = 8;
                    break;
                }
                if (gup_string_starts_with_cstr(last_word, "nine")) {
                    last_number = 9;
                    break;
                }
            }

            int line_number = (10 * first_number) + last_number;
            answer += line_number;
        }

        printf("Part 2: %d\n", answer);
    }

    gup_arena_destroy(a);
    return 0;
}
