package com.kt.edu.thirdproject.service;


import com.kt.edu.thirdproject.model.ServiceSubType;
import com.kt.edu.thirdproject.repository.ServiceSubTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceSubTypeService {
    private static ServiceSubTypeRepository serviceSubTypeRepository;
    public ServiceSubTypeService(ServiceSubTypeRepository serviceSubTypeRepository){
        this.serviceSubTypeRepository=serviceSubTypeRepository;
    }

    public List<ServiceSubType> getServiceSubTypeList() {
        return serviceSubTypeRepository.findAll();
    }
}
