package com.logmaven.exmaven;

import com.logmaven.exmaven.entity.Role;
import com.logmaven.exmaven.entity.User;
import com.logmaven.exmaven.repository.RoleRepository;
import com.logmaven.exmaven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@RestController
public class ExmavenApplication {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExmavenApplication.class, args);
	}


	@GetMapping(value = "/createadmin")
	public String createAdminUser(){

		System.out.println("#D#D#@#D#");
		User existAdminUser = userRepository.findUserByUsername("Admin");
		if(existAdminUser == null){
			User adminUser = new User();
			adminUser.setUsername("Admin");
			adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
			adminUser.setAddeddate(LocalDate.now());
			adminUser.setUserstatus(true);
			Set<Role> roles = new HashSet<>();
			roles.add(roleRepository.getReferenceById(1));
			adminUser.setRoles(roles);

			System.out.println("USER "+adminUser);

			userRepository.save(adminUser);

		}

		return "<script>window.location.replace('/login')</script>";

	}
	@Bean
	public JdbcTemplate jdbcTemplate(DataSource dataSource) {
		return new JdbcTemplate(dataSource);
	}

}
