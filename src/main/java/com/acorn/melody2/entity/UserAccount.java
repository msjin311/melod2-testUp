package com.acorn.melody2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;


@Data
@NoArgsConstructor
@Entity
@Table(name = "UserAccount")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserAccount_ID")
    private Long userAccountId;

    private String name;

    @Column(name = "Birth_Date")
    private Date birthDate;

    @Column(name = "Age_Group")
    private String ageGroup;

    @Column(name = "Account_ID", unique = true)
    private String accountId;

    @Column(name = "PassWord")
    private String password;

    private String email;

    private String gender;

    @Column(name = "Profile_Image", columnDefinition = "VARCHAR(100) DEFAULT 'default_profile_image.jpg'")
    private String profileImage;

    @Column(name = "User_Hashtags")
    private String userHashtags;

    @Column(name = "IsWithdraw")
    //데이터베이스 컬럼 이름 지정
    private int isWithdraw;
    //사용자 탈퇴여부

//    @ManyToOne
//    @JoinColumn(name = "Prefer_Genre_ID", referencedColumnName = "Genre_ID", insertable = false, updatable = false)
//    private Genre preferGenre;


}
