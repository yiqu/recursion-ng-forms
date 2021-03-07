# RecursionForms

[![Build Status](https://travis-ci.com/yiqu/recursion-ng-forms.svg?branch=master)](https://travis-ci.com/yiqu/recursion-ng-forms)

Demo: [https://yiqu.github.io/recursion-ng-forms/](https://yiqu.github.io/recursion-ng-forms/)

## Form Structure:

* Address (form control)

* Year (form control)

* Habitant (form group)
  * habitantName (form control)
  * age (form control)
  * dependents (form array)
    * The dependents array contains form groups that has a 'dependent_type' form control. The 'dependent_type' is a selection of 3 possible values: deceased, pet, or habitant. If habitant is chosen, display the Habitant form group again explained here.
      

The dependents form array could contain a Habitant, which in turn contains dependents which could contain Habitants. Thus a recursion is needed for creating and displaying the form.


      
## Example result:
```yaml

{
   "address":"1000 Friendly St.",
   "year":"2021",
   "habitant":{
      "habitantName":"Fist hab name",
      "age":"First hab age",
      "dependents":[
         {
            "dependent_type":"animal",
            "petName":"First hab's animal name"
         },
         {
            "dependent_type":"habitant",
            "habitant":{
               "habitantName":"Second hab name",
               "age":"Second hab age",
               "dependents":[
                  {
                     "dependent_type":"habitant",
                     "habitant":{
                        "habitantName":"Third hab name",
                        "age":"Third hab age",
                        "dependents":[
                           {
                              "dependent_type":"deceased"
                           },
                           {
                              "dependent_type":"habitant",
                              "habitant":{
                                 "habitantName":"Fourth hab name",
                                 "age":"Fourth hab age",
                                 "dependents":[
                                    {
                                       "dependent_type":null
                                    }
                                 ]
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         }
      ]
   }
}

```
