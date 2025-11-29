package com.sharehub.repository;

import com.sharehub.model.FileEntity;
import com.sharehub.model.Folder;
import com.sharehub.model.Share;
import com.sharehub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    List<Share> findBySharedBy(User sharedBy);
    List<Share> findBySharedWith(User sharedWith);
    List<Share> findByFile(FileEntity file);
    List<Share> findByFolder(Folder folder);
    Optional<Share> findByShareLink(String shareLink);
    
    @Query("SELECT s FROM Share s WHERE s.sharedWith = :user OR s.sharedWithEmail = :email")
    List<Share> findSharedWithUser(@Param("user") User user, @Param("email") String email);
}
