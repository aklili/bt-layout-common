package com.yulao.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Controller
public class FormController {

    @GetMapping("/form")
    public String index(Model model){

        model.addAttribute("msg", "后台数据");
        return "pages/form/index";
    }

    @GetMapping("/form/advise")
    public String advise(Model model){

        model.addAttribute("msg", "后台数据");
        return "pages/form/advise";
    }

    @GetMapping("/form/valid")
    public String valid(Model model){

        model.addAttribute("msg", "后台数据");
        return "pages/form/valid";
    }

    @GetMapping("/form/add")
    public String add(Model model){

        model.addAttribute("msg", "后台数据");
        return "pages/form/add";
    }

    @GetMapping("error/{id}")
    @ResponseBody
    public String error(@PathVariable(name = "id")Integer id){

        return "xx"+id;
    }
}
