package com.furkankaya.dto.converter;

import com.furkankaya.dto.PriceRequestResponse;
import com.furkankaya.model.Price;
import org.springframework.stereotype.Component;

@Component
public class PriceConverter {

    public PriceRequestResponse toPriceRequestResponse(Price price) {
        return new PriceRequestResponse(
                price.getOneMonths(),
                price.getThreeMonths(),
                price.getSixMonths(),
                price.getTwelveMonths()
        );
    }

}
