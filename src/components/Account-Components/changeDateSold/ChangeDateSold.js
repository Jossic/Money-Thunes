import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getYear } from '../../../utils/dateParser';
import Button from '../../UX/Button';
import SpanAlert from '../../UX/Alert/SpanAlert';

export function ChangeDateSold({ setMonth, setYear, setLoading }) {
  const currentYear = getYear();
  const [form, setForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { newYear: '', newMonth: '' } });

  const onSubmit = (data) => {
    setLoading(true),
      reset(),
      setMonth(parseInt(data.newMonth)),
      setYear(parseInt(data.newYear)),
      setLoading(false);
  };

  function toggleForm(e) {
    e.preventDefault();
    setForm(!form);
  }

  return (
    <>
      <div className="mt-8">
        <button className="items-start  bg-slate-100 mb-2" onClick={(e) => toggleForm(e)}>
          {form ? (
            <span className="w-[40px] border-2 rounded-md text-secondary p-1 ">Fermer</span>
          ) : (
            <span className="italic">voir une autre date ?</span>
          )}
        </button>
        {form && (
          // <>
          <form
            className="flex justify-center border bg-slate-100 border-slate-200"
            id="changeDateForm"
            onSubmit={handleSubmit(onSubmit)}>
            <select className="mr-2" select {...register('newMonth', { required: true })}>
              <option value="">mois</option>
              <option value="1">Janvier</option>
              <option value="2">Février</option>
              <option value="3">Mars</option>
              <option value="4">Avril</option>
              <option value="5">Mai</option>
              <option value="6">Juin</option>
              <option value="7">Juillet</option>
              <option value="8">Août</option>
              <option value="9">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décembre</option>
            </select>
            <select type="number" {...register('newYear', { required: true })}>
              <option value="">année</option>
              <option value={currentYear + 1}>{currentYear + 1}</option>
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear - 1}>{currentYear - 1}</option>
            </select>
            <div className="w-[250px] flex justify-evenly">
              <Button className="" type="reset" name={'annuler'} onClick={() => reset()}></Button>
              <Button type="submit" className="entryAddButton" name={'changer'}>
                test month
              </Button>
            </div>
          </form>
          // </>
        )}
      </div>
      {/* <button className="items-center" onClick={() => showyear()}>
        test month
      </button> */}
    </>
  );
}
