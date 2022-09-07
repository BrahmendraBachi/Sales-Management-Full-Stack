package com.example.SalesBackend.Objects;

import javax.sql.DataSource;
import java.util.List;

public interface SampleDao {
    public void setDataSource(DataSource ds);

    public List<Sample> listStudents();
}
