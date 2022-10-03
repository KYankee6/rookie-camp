package com.kt.edu.thirdproject.service;



import com.kt.edu.thirdproject.dto.ServicetypeDto;
import com.kt.edu.thirdproject.model.Servicetype;
import com.kt.edu.thirdproject.repository.ServicetypeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
public class ServicetypeService {
    private ServicetypeRepository servicetypeRepository;
    public ServicetypeService(ServicetypeRepository servicetypeRepository){
        this.servicetypeRepository=servicetypeRepository;
    }

    @Transactional
    public List<ServicetypeDto> getServicetypelist() {
        List<Servicetype> servicetypes = servicetypeRepository.findAll();
        List<ServicetypeDto> servicetypeDtoList = new ArrayList<>();

        for (Servicetype servicetype : servicetypes) {
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
