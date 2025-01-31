package com.cocollabs.app.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Base64;

@Entity
@Table(name = "files_dim")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ProfileFile {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid")
    private String id;

    private String name;

    private String type;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    public String getBase64Data() {
        return Base64.getEncoder().encodeToString(this.data);
    }

}
