import { Button, ChakraProvider, Input, Box } from "@chakra-ui/react";
import React from "react";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';

interface ChakraPhoneProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
}

export const ChakraPhone: React.FC<ChakraPhoneProps> = ({
  value,
  onChange,
  placeholder = "Ingrese su número de teléfono" // Default placeholder
}) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "us",
    value,
    onChange: (data) => {
      onChange(data.phone);
    }
  });

  return (
    <ChakraProvider>
      <Box display="flex" alignItems="center">
        <CountrySelector
          selectedCountry={phoneInput.country?.iso2 || "US"}
          onSelect={(country) => phoneInput.setCountry(country.iso2)}
          renderButtonWrapper={({ children, rootProps }) => (
            <Button {...rootProps} variant="outline" px="4px" mr="8px" width="fit-content">
              {children}
            </Button>
          )}
        />
        <Input
          placeholder={placeholder}
          type="tel"
          color="primary"
          value={phoneInput.phone}
          onChange={phoneInput.handlePhoneValueChange}
          width="100%"
          ref={phoneInput.inputRef}
        />
      </Box>
    </ChakraProvider>
  );
};
