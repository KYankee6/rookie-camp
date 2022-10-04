package com.kt.edu.thirdproject.service;



import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.ServiceType;
import com.kt.edu.thirdproject.repository.ServiceTypeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
public class ServiceTypeService {
    private static ServiceTypeRepository servicetypeRepository;
    public ServiceTypeService(ServiceTypeRepository servicetypeRepository){
        this.servicetypeRepository=servicetypeRepository;
    }

    @Transactional
    public List<ServiceTypeDto> getServiceTypeList() {
        List<ServiceType> servicetypes = servicetypeRepository.findAll();
        List<ServiceTypeDto> servicetypeDtoList = new ArrayList<>();

        for (ServiceType servicetype : servicetypes) {
            ServiceTypeDto servtypeDto = ServiceTypeDto.builder()
                    .id(servicetype.getId())
                    .name(servicetype.getName())
                    .cnt(servicetype.getCnt())
                    .img(servicetype.getImg())
                    .build();
            servicetypeDtoList.add(servtypeDto);
        }
        return servicetypeDtoList;
    }
}
