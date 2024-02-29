import { DatePicker as DatePickerInternal } from '@navikt/ds-react';
import { addYears, format, isAfter, isBefore, isValid, parse, subDays, subYears } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '@app/language/use-translation';
import { PRETTY_FORMAT } from './constants';

interface Props {
  disabled?: boolean;
  error?: string;
  fromDate?: Date;
  id: string;
  label: React.ReactNode;
  onChange: (date: Date | null) => void;
  toDate?: Date;
  value: Date | null;
  size: 'small' | 'medium';
  centuryThreshold?: number;
  onBlur?: () => void;
}

export const DatePicker = ({
  disabled,
  error,
  fromDate = new Date(1970),
  id,
  label,
  onChange,
  toDate = new Date(),
  value,
  size,
  centuryThreshold = 50,
  onBlur,
}: Props) => {
  const [inputError, setInputError] = useState<string>();
  const [input, setInput] = useState<string>(value === null ? '' : format(value, PRETTY_FORMAT));
  const { error_messages } = useTranslation();

  useEffect(() => {
    setInput(value === null ? '' : format(value, PRETTY_FORMAT));
    setInputError(undefined);
  }, [value]);

  const selected = value ?? undefined;

  const onDateChange = (date?: Date) => {
    setInputError(undefined);

    if (date === undefined) {
      onChange(null);
    } else {
      onChange(date);
    }
  };

  const [month, setMonth] = useState(selected);

  const validateInput = useCallback(
    (fullInput: string) => {
      const date = parse(fullInput, PRETTY_FORMAT, new Date());
      const validFormat = isValid(date);
      const validRange = isAfter(date, subDays(fromDate, 1)) && isBefore(date, toDate);

      if (!validFormat) {
        setInputError(error_messages.date.invalid_format);

        return;
      }

      if (!validRange) {
        setInputError(error_messages.date.invalid_range(fromDate, toDate));

        return;
      }

      setInputError(undefined);
      onChange(date);
    },
    [error_messages.date, fromDate, onChange, toDate],
  );

  const onInputBlur = useCallback(() => {
    if (input === '') {
      setInputError(undefined);
      onChange(null);

      return;
    }

    const parts = input.split('.');

    // Prefix with reasonable century, e.g. 20 for 2022 and 19 for 1999.
    if (isDateParts(parts)) {
      const [dd, mm, yy] = parts;
      const date = `${dd.padStart(2, '0')}.${mm.padStart(2, '0')}.${getFullYear(yy, centuryThreshold)}`;
      setInput(date);
      requestAnimationFrame(() => validateInput(date));

      return;
    }

    const chars = input.split('');

    // 211220 -> 21.12.2020
    if (isSixChars(chars)) {
      const [d1, d2, m1, m2, y1, y2] = chars;
      const date = `${d1}${d2}.${m1}${m2}.${getFullYear(`${y1}${y2}`, centuryThreshold)}`;
      setInput(date);
      requestAnimationFrame(() => validateInput(date));

      return;
    }

    // 31122020 -> 31.12.2020
    if (isEightChars(chars)) {
      const [d1, d2, m1, m2, y1, y2, y3, y4] = chars;
      const date = `${d1}${d2}.${m1}${m2}.${y1}${y2}${y3}${y4}`;
      setInput(date);
      requestAnimationFrame(() => validateInput(date));

      return;
    }

    // Current year if the date is in the past, otherwise previous year.
    // 3112 -> 31.12.2021
    if (isFourChars(chars)) {
      const [d1, d2, m1, m2] = chars;
      const dateObject = parse(`${d1}${d2}.${m1}${m2}`, 'dd.MM', new Date());

      if (!isValid(dateObject)) {
        validateInput(input);

        return;
      }

      if (isAfter(dateObject, toDate)) {
        const date = format(subYears(dateObject, 1), PRETTY_FORMAT);
        setInput(date);
        requestAnimationFrame(() => validateInput(date));

        return;
      }

      if (isBefore(dateObject, fromDate)) {
        const date = format(addYears(dateObject, 1), PRETTY_FORMAT);
        setInput(date);
        requestAnimationFrame(() => validateInput(date));

        return;
      }

      const date = format(dateObject, PRETTY_FORMAT);
      setInput(date);
      requestAnimationFrame(() => validateInput(date));

      return;
    }

    validateInput(input);
  }, [centuryThreshold, fromDate, input, onChange, toDate, validateInput]);

  return (
    <DatePickerInternal
      mode="single"
      data-testid={id}
      id={id}
      fromDate={fromDate}
      toDate={toDate}
      defaultSelected={selected}
      selected={selected}
      onSelect={onDateChange}
      locale="nb"
      dropdownCaption
      month={month}
      onMonthChange={setMonth}
      onOpenToggle={() => setMonth(selected)}
    >
      <DatePickerInternal.Input
        error={error ?? inputError}
        label={label}
        disabled={disabled}
        value={input}
        onChange={({ target }) => setInput(target.value)}
        onBlur={() => {
          onInputBlur();
          onBlur?.();
        }}
        size={size}
      />
    </DatePickerInternal>
  );
};

const getFullYear = (year: string, centuryThreshold: number): string => {
  if (year.length === 2) {
    const century = Number.parseInt(year, 10) <= centuryThreshold ? '20' : '19';

    return `${century}${year}`;
  }

  return year;
};

const isDateParts = (parts: string[]): parts is [string, string, string] => parts.length === 3;

const isFourChars = (parts: string[]): parts is [string, string, string, string] => parts.length === 4;
const isSixChars = (parts: string[]): parts is [string, string, string, string, string, string] => parts.length === 6;
const isEightChars = (parts: string[]): parts is [string, string, string, string, string, string, string, string] =>
  parts.length === 8;
