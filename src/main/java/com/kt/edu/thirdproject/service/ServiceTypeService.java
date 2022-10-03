package com.kt.edu.thirdproject.service;



import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.ServiceType;
import com.kt.edu.thirdproject.repository.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
public class ServiceTypeService {


    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    public ServiceTypeService(ServiceTypeRepository serviceTypeRepository){
        this.serviceTypeRepository=serviceTypeRepository;
    }

    @Transactional
    public List<ServiceTypeDto> getServiceTypeList() {
        List<ServiceType> serviceTypes = serviceTypeRepository.findAll();
        List<ServiceTypeDto> serviceTypeDtoList = new ArrayList<>();

        for (ServiceType servicetype : serviceTypes) {
            ServiceTypeDto serviceTypeDto = ServiceTypeDto.builder()
                    .id(servicetype.getId())
                    .name(servicetype.getName())
                    .cnt(servicetype.getCnt())
                    .img(servicetype.getImg())
                    .build();
            serviceTypeDtoList.add(serviceTypeDto);
        }
        return serviceTypeDtoList;
    }
}
