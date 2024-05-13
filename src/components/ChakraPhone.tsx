import { Button, ChakraProvider, Input } from "@chakra-ui/react";
import React from "react";

import { CountrySelector, usePhoneInput } from "react-international-phone";

interface ChakraPhoneProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string; // Add this line to include the placeholder property
}


export const ChakraPhone: React.FC<ChakraPhoneProps> = ({
  value,
  onChange
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <CountrySelector
          selectedCountry={phoneInput.country?.iso2 || "US"} // Default to "US" if undefined
          onSelect={(country) => phoneInput.setCountry(country.iso2)}
          renderButtonWrapper={({ children, rootProps }) => (
            <Button {...rootProps} variant="outline" px="4px" mr="8px" width="fit-content">
              {children}
            </Button>
          )}
        />
        <Input
          placeholder="Ingrese su número de teléfono" // Placeholder added here
          type="tel"
          color="primary"
          value={phoneInput.phone}
          onChange={phoneInput.handlePhoneValueChange}
          width="200px"
          ref={phoneInput.inputRef}
          style={{ zIndex: 2 }} // Added z-index
        />
      </div>


    </ChakraProvider>
  );
};
