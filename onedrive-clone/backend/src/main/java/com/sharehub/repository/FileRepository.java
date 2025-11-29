package com.sharehub.repository;

import com.sharehub.model.FileEntity;
import com.sharehub.model.Folder;
import com.sharehub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByOwnerAndFolderIsNullAndIsTrashedFalse(User owner);
    List<FileEntity> findByOwnerAndFolderAndIsTrashedFalse(User owner, Folder folder);
    List<FileEntity> findByOwnerAndIsTrashedTrue(User owner);
    List<FileEntity> findByOwnerAndIsFavoriteTrueAndIsTrashedFalse(User owner);
    Optional<FileEntity> findByIdAndOwner(Long id, User owner);
    
    @Query("SELECT f FROM FileEntity f WHERE f.owner = :owner AND f.name LIKE %:query% AND f.isTrashed = false")
    List<FileEntity> searchByName(@Param("owner") User owner, @Param("query") String query);
    
    @Query("SELECT f FROM FileEntity f WHERE f.isTrashed = true AND f.trashedAt < :date")
    List<FileEntity> findTrashedFilesOlderThan(@Param("date") LocalDateTime date);
}
