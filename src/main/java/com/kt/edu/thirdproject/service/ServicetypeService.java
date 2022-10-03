package com.kt.edu.thirdproject.service;



import com.kt.edu.thirdproject.dto.ServicetypeDto;
import com.kt.edu.thirdproject.model.ServiceType;
import com.kt.edu.thirdproject.repository.ServiceTypeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
public class ServicetypeService {
    private ServiceTypeRepository servicetypeRepository;
    public ServicetypeService(ServiceTypeRepository servicetypeRepository){
        this.servicetypeRepository=servicetypeRepository;
    }

    @Transactional
    public List<ServicetypeDto> getServicetypelist() {
        List<ServiceType> servicetypes = servicetypeRepository.findAll();
        List<ServicetypeDto> servicetypeDtoList = new ArrayList<>();

        for (ServiceType servicetype : servicetypes) {
            ServicetypeDto servtypeDto = ServicetypeDto.builder()
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
