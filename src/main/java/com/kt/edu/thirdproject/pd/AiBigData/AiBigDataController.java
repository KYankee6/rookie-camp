package com.kt.edu.thirdproject.pd.AiBigData;

import com.kt.edu.thirdproject.exception.ResourceNotFoundException;
import com.kt.edu.thirdproject.model.Employee;
import com.kt.edu.thirdproject.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AiBigDataController {
    // get all employees
    @GetMapping("/pd/P_PD_AI_CC_001.do")
    public String AICCPage() {
        return "pd/P_PD_AI_CC_001";
    }

}
