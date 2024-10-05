#include "guppy.h"

bool is_alpha(char c) {
    return isalpha(c);
}

bool is_digit(char c) {
    return (
        c == '1' ||
        c == '2' ||
        c == '3' ||
        c == '4' ||
        c == '5' ||
        c == '6' ||
        c == '7' ||
        c == '8' ||
        c == '9'
    );
}

int char_to_int(char c) {
    if (c == '0') return 0;
    if (c == '1') return 1;
    if (c == '2') return 2;
    if (c == '3') return 3;
    if (c == '4') return 4;
    if (c == '5') return 5;
    if (c == '6') return 6;
    if (c == '7') return 7;
    if (c == '8') return 8;
    if (c == '9') return 9;

    return -1;
}

int main(void) {
    { // Part 1
        int answer = 0;

        GupArrayString lines = gup_file_read_lines("../input.txt");

        for (int i = 0; i < lines.count; i++) {
            GupArrayChar line = gup_array_char_copy(lines.data[i]);

            int first_number = 0;
            int last_number = 0;

            GupArrayChar first_word = gup_array_char_create();
            for (int i = 0; i < line.count; i++) {
                if (is_digit(line.data[i])) {
                    first_number = char_to_int(line.data[i]);
                    break;
                }

                gup_array_char_append(&first_word, line.data[i]);
            }
            gup_array_char_destroy(first_word);

            GupArrayChar last_word = gup_array_char_create();
            for (int i = line.count-1; i >= 0; i--) {
                if (is_digit(line.data[i])) {
                    last_number = char_to_int(line.data[i]);
                    break;
                }
                
                gup_array_char_prepend(&last_word, line.data[i]);
            }
            gup_array_char_destroy(last_word);

            int line_number = (10 * first_number) + last_number; 
            answer += line_number;

            gup_array_char_destroy(line);
        }

        printf("Part 1: %d\n", answer);

        gup_array_string_destroy(lines);
    }

    { // Part 2
        int answer = 0;

        GupArrayString lines = gup_file_read_lines("../input.txt");

        for (int i = 0; i < lines.count; i++) {
            GupArrayChar line = gup_array_char_copy(lines.data[i]);

            int first_number = 0;
            int last_number = 0;

            GupArrayChar first_word = gup_array_char_create();
            for (int i = 0; i < line.count; i++) {
                if (is_digit(line.data[i])) {
                    first_number = char_to_int(line.data[i]);
                    break;
                }

                gup_array_char_append(&first_word, line.data[i]);
                GupStringView sv = gup_sv_create_from_parts(first_word.data, first_word.count);

                if (gup_sv_ends_with(sv, SV("one"))) {
                    first_number = 1;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("two"))) {
                    first_number = 2;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("three"))) {
                    first_number = 3;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("four"))) {
                    first_number = 4;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("five"))) {
                    first_number = 5;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("six"))) {
                    first_number = 6;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("seven"))) {
                    first_number = 7;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("eight"))) {
                    first_number = 8;
                    break;
                }
                if (gup_sv_ends_with(sv, SV("nine"))) {
                    first_number = 9;
                    break;
                }
            }
            gup_array_char_destroy(first_word);

            GupArrayChar last_word = gup_array_char_create();
            for (int i = line.count-1; i >= 0; i--) {
                if (is_digit(line.data[i])) {
                    last_number = char_to_int(line.data[i]);
                    break;
                }
                
                gup_array_char_prepend(&last_word, line.data[i]);
                GupStringView sv = gup_sv_create_from_parts(last_word.data, last_word.count);

                if (gup_sv_starts_with(sv, SV("one"))) {
                    last_number = 1;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("two"))) {
                    last_number = 2;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("three"))) {
                    last_number = 3;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("four"))) {
                    last_number = 4;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("five"))) {
                    last_number = 5;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("six"))) {
                    last_number = 6;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("seven"))) {
                    last_number = 7;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("eight"))) {
                    last_number = 8;
                    break;
                }
                if (gup_sv_starts_with(sv, SV("nine"))) {
                    last_number = 9;
                    break;
                }
            }
            gup_array_char_destroy(last_word);

            int line_number = (10 * first_number) + last_number; 
            answer += line_number;

            gup_array_char_destroy(line);
        }

        printf("Part 2: %d\n", answer);

        gup_array_string_destroy(lines);
    }

    return 0;
}
