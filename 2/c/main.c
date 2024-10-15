#include "guppy.h"

bool is_digit(char c) {
    return c >= '0' && c <= '9';
}

void trim_whitespace(GupString *str) {
    gup_string_trim_char_in_place(str, ' ');
}

int main(void) {
    GupArena a = gup_arena_create();
    
    { // Part 1
        int part_one_answer = 0;
        const int max_possible_red = 12;
        const int max_possible_green = 13;
        const int max_possible_blue = 14;

        GupArrayString lines = gup_file_read_lines_arena(&a, "../input.txt");
    
        for (int i = 0; i < lines.count; i ++) {
            // ["Game 1738", " 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"]
            GupArrayString tokens = gup_string_split_arena(&a, lines.data[i], ':');
            // [" 1 blue, 2 green", " 3 green, 4 blue, 1 red", " 1 green, 1 blue"]
            GupArrayString rounds = gup_string_split_arena(&a, tokens.data[1], ';');
            // ["1 blue, 2 green", "3 green, 4 blue, 1 red", "1 green, 1 blue"]
            gup_array_string_map_in_place(&rounds, trim_whitespace);

            int max_red = 0, max_green = 0, max_blue = 0;
            for (int j = 0; j < rounds.count; j++) {
                // ["1 blue", " 2 green"]
                GupArrayString draws = gup_string_split_arena(&a, rounds.data[j], ',');
                // ["1 blue", "2 green"]
                gup_array_string_map_in_place(&draws, trim_whitespace);
                for (int k = 0; k < draws.count; k++) {
                    // ["1", "blue"]
                    GupArrayString draw_tokens = gup_string_split_arena(&a, draws.data[k], ' ');
                    int count;
                    gup_assert_verbose(gup_string_to_int(draw_tokens.data[0], &count), "Expected draw to have a count but it didn't");
                    if (gup_string_eq(draw_tokens.data[1], gup_string(&a, "red"))) {
                        if (count > max_red) {
                            max_red = count;
                        }
                    }
                    if (gup_string_eq(draw_tokens.data[1], gup_string(&a, "green"))) {
                        if (count > max_green) {
                            max_green = count;
                        }
                    }
                    if (gup_string_eq(draw_tokens.data[1], gup_string(&a, "blue"))) {
                        if (count > max_blue) {
                            max_blue = count;
                        }
                    }
                }
            }

            if (max_red <= max_possible_red && max_green <= max_possible_green && max_blue <= max_possible_blue) {
                // "Game 1738" -> "1738"
                GupString game_id_str = gup_string_filter_arena(&a, tokens.data[0], is_digit);

                // "1738" -> 1738
                int game_id;
                gup_assert(gup_string_to_int(game_id_str, &game_id));

                part_one_answer += game_id;
            }

            // gup_array_string_print(tokens);
        }

        printf("answer: %d\n", part_one_answer);
        gup_assert(part_one_answer == 8);
    }
    
    gup_arena_destroy(a);
    return 0;
}
