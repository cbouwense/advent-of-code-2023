#include "guppy.h"

bool is_digit(char c) {
    return c >= '0' && c <= '9';
}

void trim_whitespace(GupString *str) {
    gup_string_trim_char_in_place(str, ' ');
}

void part_one(void) {
    GupArena a = gup_arena_create();

    int part_one_answer = 0;
    const int max_possible_red = 12;
    const int max_possible_green = 13;
    const int max_possible_blue = 14;

    GupArrayString lines = gup_file_read_lines_arena(&a, "../input.txt");

    for (int i = 0; i < lines.count; i++) {
        // "Game 1: 7 green, 4 blue, 3 red; 4 blue, 10 red, 1 green; 1 blue, 9 red"
        GupString line = lines.data[i];

        int max_red = 0, max_green = 0, max_blue = 0;

        bool passed_colon = false;
        bool parsing_count = false;
        for (int j = 0; j < line.count; j++) {
            if (!passed_colon) {
                if (line.data[j] != ':') continue;

                passed_colon = true;
            }

            if (!parsing_count) {
                if (!is_digit(line.data[j])) continue;

                parsing_count = true;
            }

            if (parsing_count) {
                int digit_len = 0;
                while (is_digit(line.data[j])) {
                    j++;
                    digit_len++;
                }
                // Skip past the space between the count and the number (e.g. "1337 blue")
                j++;

                GupString count_view = (GupString){
                    .count = digit_len,
                    .capacity = digit_len,
                    .data = &line.data[j - digit_len - 1],
                };

                int count;
                gup_assert(gup_string_to_int(count_view, &count));
                if (line.data[j] == 'r') {
                    j += 2;
                    if (count > max_red) {
                        max_red = count;
                    }
                }
                if (line.data[j] == 'g') {
                    j += 4;
                    if (count > max_green) {
                        max_green = count;
                    }
                }
                if (line.data[j] == 'b') {
                    j += 3;
                    if (count > max_blue) {
                        max_blue = count;
                    }
                }

                parsing_count = false;
            }
        }

        bool game_is_impossible = max_red <= max_possible_red && max_green <= max_possible_green && max_blue <= max_possible_blue;
        if (game_is_impossible) {
            part_one_answer += i + 1;
        }
    }

    printf("answer: %d\n", part_one_answer);

    gup_arena_destroy(a);
}

void part_two(void) {
    GupArena a = gup_arena_create();

    int part_two_answer = 0;

    GupArrayString lines = gup_file_read_lines_arena(&a, "../input.txt");

    for (int i = 0; i < lines.count; i++) {
        // "Game 1: 7 green, 4 blue, 3 red; 4 blue, 10 red, 1 green; 1 blue, 9 red"
        GupString line = lines.data[i];

        int max_red = 0, max_green = 0, max_blue = 0;

        bool passed_colon = false;
        bool parsing_count = false;
        for (int j = 0; j < line.count; j++) {
            if (!passed_colon) {
                if (line.data[j] != ':') continue;

                passed_colon = true;
            }

            if (!parsing_count) {
                if (!is_digit(line.data[j])) continue;

                parsing_count = true;
            }

            if (parsing_count) {
                int digit_len = 0;
                while (is_digit(line.data[j])) {
                    j++;
                    digit_len++;
                }
                // Skip past the space between the count and the number (e.g. "1337 blue")
                j++;

                GupString count_view = (GupString){
                    .count = digit_len,
                    .capacity = digit_len,
                    .data = &line.data[j - digit_len - 1],
                };

                int count;
                gup_assert(gup_string_to_int(count_view, &count));
                if (line.data[j] == 'r') {
                    j += 2;
                    if (count > max_red) {
                        max_red = count;
                    }
                }
                if (line.data[j] == 'g') {
                    j += 4;
                    if (count > max_green) {
                        max_green = count;
                    }
                }
                if (line.data[j] == 'b') {
                    j += 3;
                    if (count > max_blue) {
                        max_blue = count;
                    }
                }

                parsing_count = false;
            }
        }

        part_two_answer += max_red * max_green * max_blue;
    }

    printf("answer: %d\n", part_two_answer);

    gup_arena_destroy(a);
}

int main(void) {
    
    
    gup_operation_seconds(part_one);
    gup_operation_seconds(part_two);
    
    
    return 0;
}
