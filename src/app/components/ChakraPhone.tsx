'use client';

import { Input, InputGroup, InputLeftElement, Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';

interface ChakraPhoneProps {
  defaultCountry?: string;
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
}

export const ChakraPhone: React.FC<ChakraPhoneProps> = ({
  defaultCountry,
  value,
  onChange,
  placeholder = "Ingrese su número de teléfono"
}) => {
  const phoneInput = usePhoneInput({
    defaultCountry: defaultCountry || "co",
    value,
    onChange: (data) => {
      onChange(data.phone);
    }
  });

  // Theme-aware colors
  const bg = useColorModeValue("gray.50", "gray.700");
  const border = useColorModeValue("gray.300", "gray.600");
  const text = useColorModeValue("gray.900", "white");

  return (
    <InputGroup>
      <InputLeftElement width="auto" px={0}>
        <Box display="flex" alignItems="center">
          <CountrySelector
            selectedCountry={phoneInput.country?.iso2 || "CO"}
            onSelect={(country) => phoneInput.setCountry(country.iso2)}
            renderButtonWrapper={({ children, rootProps }) => (
              <Button {...rootProps} variant="ghost" px="2px" mr="2px" minW="fit-content" height="32px">
                {children}
              </Button>
            )}
          />
          <Box color={text} fontWeight="medium" minW="36px" textAlign="center">
            +{phoneInput.country?.dialCode || ""}
          </Box>
        </Box>
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        type="tel"
        value={phoneInput.inputValue}
        onChange={phoneInput.handlePhoneValueChange}
        ref={phoneInput.inputRef}
        pl="90px"
        bg={bg}
        borderColor={border}
        color={text}
        rounded="lg"
        size="md"
      />
    </InputGroup>
  );
};