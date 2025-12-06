int romanToInt(char* s) {
    int result = 0;
    int length = 0;

    // Find string length
    while (s[length] != 0) {
        length++;
    }

    int str[length];   // array to store integer values

    for (int i = 0; i < length; i++) {

        switch (s[i]) {

        case 'I':
            if (i + 1 < length && (s[i+1] == 'V' || s[i+1] == 'X'))
                str[i] = -1;
            else
                str[i] = 1;
            break;

        case 'V':
            str[i] = 5;
            break;

        case 'X':
            if (i + 1 < length && (s[i+1] == 'L' || s[i+1] == 'C'))
                str[i] = -10;
            else
                str[i] = 10;
            break;

        case 'L':
            str[i] = 50;
            break;

        case 'C':
            if (i + 1 < length && (s[i+1] == 'D' || s[i+1] == 'M'))
                str[i] = -100;
            else
                str[i] = 100;
            break;

        case 'D':
            str[i] = 500;
            break;

        case 'M':
            str[i] = 1000;
            break;

        default:
            printf("Invalid roman integer\n");
            return 0;
        }
    }

    // sum all values
    for (int i = 0; i < length; i++) {
        result += str[i];
    }

    return result;
}
