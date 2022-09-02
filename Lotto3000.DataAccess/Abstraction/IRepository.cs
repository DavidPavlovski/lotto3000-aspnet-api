namespace Lotto3000.DataAccess.Abstraction
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Create(T entity);
        void Update(T entity, int id);
        void Delete(T entity);
    }
}
