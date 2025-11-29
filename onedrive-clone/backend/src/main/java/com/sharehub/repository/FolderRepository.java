package com.sharehub.repository;

import com.sharehub.model.Folder;
import com.sharehub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByOwnerAndParentIsNull(User owner);
    List<Folder> findByOwnerAndParent(User owner, Folder parent);
    Optional<Folder> findByIdAndOwner(Long id, User owner);
    
    @Query("SELECT f FROM Folder f WHERE f.owner = :owner AND f.name LIKE %:query%")
    List<Folder> searchByName(@Param("owner") User owner, @Param("query") String query);
}
