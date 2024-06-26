package org.egov.vehicle.web.model;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VehicleRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo RequestInfo = null;

    @Valid
    @JsonProperty("vehicle")
    private Vehicle vehicle;

    public VehicleRequest(RequestInfo requestInfo, Vehicle vehicleForUpdate, Object o) {
    }
}
