namespace Lotto3000.DataAccess.Abstraction
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Create(T entity);
        void Update(T entity);
        void Update(List<T> entities);
        void Delete(T entity);
    }
}
